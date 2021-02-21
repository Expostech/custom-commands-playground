export default function Sidenav() {
    return (
        <div className="container w-1/4 bg-green-600 py-10 px-5 h-screen text-justify">
            <p>
                This is a playground for a new syntax of CSMM custom commands,
                it uses <a className="text-green-200" href="https://handlebarsjs.com/guide/#what-is-handlebars">Handlebars templating</a> which
                allows more advanced features, like loops and conditional statements.
            </p>
            <Divider />
            <p>
                You can switch "modes" by selecting a dataset on the top right panel.
                These datasets are randomly generated, if you don't like the ones you got, you can refresh this page to get new ones!
            </p>
        </div>
    );
}


const Divider = () => {
    return (
        <div className="w-full p-3" />
    )
}