import { useState } from 'react';

import Examples from './examples';
import H1 from './H1';

export default function Sidenav() {

    return (
        <div className={`w-1/4 max-h-screen`}  >
            <div className={`container overflow-auto bg-green-600 py-10 px-5 h-full max-h-screen`}>
                <article>
                    <p>
                        This is a playground for a new syntax of CSMM custom commands,
                it uses <a className="text-green-200" target="_blank" href="https://handlebarsjs.com/guide/#what-is-handlebars">Handlebars templating</a> which
                allows more advanced features, like loops and conditional statements.
                </p>
                    <Divider />
                    <p>
                        You can switch "modes" by selecting a dataset on the top right panel.
                        These datasets are randomly generated, if you don't like the ones you got, you can refresh this page to get new ones!
                    </p>
                    <Divider />
                    <p>
                        On top of the regular Handlebars syntax, there are a number of additional helpers available.
                    </p>
                    <ul className="py-2">
                        <li>eq (equals)</li>
                        <li>ne (not equal)</li>
                        <li>gt (greater than)</li>
                        <li>gte (greater than or equal)</li>
                        <li>lt (less than)</li>
                        <li>lte (less than or equal)</li>
                        <li>or</li>
                        <li>and</li>
                        <li>not</li>
                        <li>sum</li>
                        <li>subtract</li>
                        <li>multiply</li>
                        <li>divide</li>
                    </ul>
                    <p>
                        You can use these helpers in conditional statements like:
                    </p>
                    <code className="block whitespace-pre-wrap py-3">
                        {/* :D */}
                        {`{{#if (gt player.level 100)}}"}
say \"Your command here\"
{{/if}}`}
                    </code>
                    <p>Or like this:</p>
                    <code className="block whitespace-pre-wrap py-3">
                        {/* :D */}
                        {`say "1 + 1 = {{sum 1 1}}"`}
                    </code>

                    <Divider />
                    <H1 text="Examples" />
                    <Examples></Examples>
                </article>
            </div>
        </div>
    );
}


const Divider = () => {
    return (
        <div className="w-full p-3" />
    )
}