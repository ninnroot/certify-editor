
interface route {
    href: string;
    title: string

}

const adminRoutes: route[] = [
    {
        href: "/",
        title: "Home"
    },
    {
        href: "/certificates/create",
        title: "Generate certificates"
    },
    
    
]


export {adminRoutes}