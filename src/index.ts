import fs from 'fs';
import path from 'path';

import {ParameterType} from 'typedoc';
import {RendererEvent} from 'typedoc/dist/lib/output/events';
import {PluginHost} from 'typedoc/dist/lib/utils';

export function load(host: PluginHost): void {
  const app = host.application;

  app.options.addDeclaration({
    name: 'cname',
    help: 'Add CNAME file to the output directory with the provided content',
    type: ParameterType.String,
    defaultValue: '',
  });

  app.renderer.once(RendererEvent.END, (context: RendererEvent) => {
    const cnameValue = app.options.getValue('cname');
    if (typeof cnameValue === 'string' && cnameValue.length > 0) {
      fs.writeFileSync(path.resolve(context.outputDirectory, 'CNAME'), cnameValue);
    }
  });
}
