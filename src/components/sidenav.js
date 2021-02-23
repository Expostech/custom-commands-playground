import { useState } from "react";
import Examples from "./examples";
import H1 from "./H1";

export default function Sidenav() {
    const [collapsed, setCollapsed] = useState(false);
    const collapseClick = (e) => { setCollapsed(!collapsed) }

    return (
        <div className={`${collapsed ? "w-10 " : "w-1/4"} ease-in-out transition-all duration-1000 max-h-screen`}  >
            <div onClick={collapseClick} className={`container overflow-hidden bg-green-600 py-10 px-5 h-full max-h-screen`}>
                <article className={`${collapsed ? "opacity-0 delay-200" : "delay-500 "} duration-75 transition-all`}>
                    <p>
                        {collapsed}
                    This is a playground for a new syntax of CSMM custom commands,
                it uses <a className="text-green-200" href="https://handlebarsjs.com/guide/#what-is-handlebars">Handlebars templating</a> which
                allows more advanced features, like loops and conditional statements.
                </p>
                    <Divider />
                    <p>
                        You can switch "modes" by selecting a dataset on the top right panel.
                        These datasets are randomly generated, if you don't like the ones you got, you can refresh this page to get new ones!
                </p>
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