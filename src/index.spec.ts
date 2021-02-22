import path from 'path';

// Mocks
jest.mock('fs', () => {
  const fsm = jest.requireActual('fs') as typeof fs;
  fsm.writeFileSync = jest.fn().mockImplementation(fsm.writeFileSync);
  return fsm;
});
import fs from 'fs';

const fsMock = fs as jest.Mocked<typeof fs>;

// Import under test
import {Application} from 'typedoc';

describe('typedoc-plugin-cname', () => {
  it('should add CNAME file when rendering HTML', async () => {
    // Setup
    const cnameValue = 'test.host';
    const outputDir = './testdocs/html';
    const app = new Application();
    app.options.setValue('plugin', [path.resolve(__dirname, 'index.ts')]);
    app.plugins.load();
    app.options.setValue('cname', cnameValue);

    // Act
    const project = app.convert();
    if (project) await app.generateDocs(project, outputDir);

    // Assert
    expect(fsMock.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fsMock.writeFileSync).toHaveBeenCalledWith(path.resolve(outputDir, 'CNAME'), cnameValue);
  });

  it('should not add CNAME file without cname option', async () => {
    // Setup
    const outputDir = './testdocs/html_unset';
    const app = new Application();
    app.options.setValue('plugin', [path.resolve(__dirname, 'index.ts')]);
    app.options.setValue('out', [path.resolve(__dirname, 'index.ts')]);
    app.plugins.load();

    // Act
    const project = app.convert();
    if (project) await app.generateDocs(project, outputDir);

    // Assert
    expect(fsMock.writeFileSync).toHaveBeenCalledTimes(0);
  });

  it('should not add a CNAME file when rendering JSON', async () => {
    // Setup
    const cnameValue = 'test.host';
    const outputDir = './testdocs/json';
    const app = new Application();
    app.options.setValue('plugin', [path.resolve(__dirname, 'index.ts')]);
    app.plugins.load();
    app.options.setValue('cname', cnameValue);

    // Act
    const project = app.convert();
    if (project) await app.generateJson(project, outputDir);

    // Assert
    expect(fsMock.writeFileSync).toHaveBeenCalledTimes(0);
  });
});
