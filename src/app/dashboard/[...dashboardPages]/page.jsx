import { notFound } from "next/navigation";

function displaypage(dashboardPages){
    if (dashboardPages.length === 1 ) {
        switch (dashboardPages[0])   {
           case  "formateurs": return "Formateurs Page";
           case  "settings": return "Settings Page";
           case  "edit":   return "Edit Profil Page";
           case  "analytics":   return "Dashboard Page";
           default: notFound()     
              }
        }
    else if (dashboardPages.length === 2 && dashboardPages[1] === "destroy") {
        return <div>delete you accent</div>;
    }
} 

export default function DashboardPage({params: {dashboardPages}}) {   
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="z-10 max-w-5xl w-full items-center justify-between lg:flex">
    
         <h1 className="text-2xl">{displaypage(dashboardPages)}</h1>
    </div>
    </main>
  );
}