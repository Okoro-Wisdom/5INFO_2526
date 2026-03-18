import { json } from "@sveltejs/kit";
import Database from "better-sqlite3"

const db= new Database("TODO.db",{verbose: console.log});


let todos = [
    {
        id: 1,
        task: "Studiare TPSI",
        done: true,
        priority: 1
    },

    {
        id: 2,
        task: "Studiare RETI",
        done: true,
        priority: 2
    }
];

export async function GET({params, request,url}) 
{
    console.log("RICEVUTO HTTP GET con parametro:", params);
    
    const sql_azione2 = db.prepare("SELECT + FROM todo");
    const sql_azione3 = db.prepare("SELECT + FROM todo WHERE id = ?");
    const sql_azione4 = db.prepare("SELECT + FROM todo WHERE done = ?");
    const sql_azione5 = db.prepare("SELECT + FROM todo WHERE priority = ?");

    const exec_query = (azione,param) => {
        const todo = param || param == 0 ? azione.all(param) : azione.all();
        if(todo.length > 0){
            return json(todo,{status:200});
        }else{
            return json({},{status:404});
        }
    }
    try{
        if(params.id){
            return exec_query(sql_azione3,params.id)
        }
        if(url.searchParams.has("priority")){
            return exec_query(sql_azione5,+url.searchParams.get("priority"));
        }
        if(url.searchParams.has("done")){
            return exec_query(sql_azione4,+JSON.searchParams.get("done"));
        }
        return exec_query(sqlite_azione2)
       
    }catch(e){
        return json({},{status:500});
    }
}
    if(params.id) {
        let todo = todos.filter(t => t.id == params.id)[0];
        return json("ERROR NOT FOUND")
    }
    let res = todos;
        if(url.searchParams.has('priority')){
            res = todos.filter(t => t.priority == +url.searchParams.get('priority'));
            return json(res)
        }else if(url.searchParams.has('done')){
            res = todos.filter(t => t.done == (url.searchParams.get('done') === 'true'));
            return json(res)
        }
        return json("ERROR NOT FOUND")
    



export async function POST({request}) {
    console.log("RICEVUTO HTTP POST")

    const body = await request.json();
    console.log("BODY:", body)
    body["id"] = Math.ceil(Math.random() * 100);

    todos.push(body);

    return json('OK')
}   


export async function PUT({params, request}) {
    console.log("Ricevuto HTTP PUT con parametro: ", params)

    const body = await request.json();
    console.log("PUT BODY: ", body)

    let todo = todos.findIndex( t => t.id == params.id);

    todos[todo] = body;
    console.log(todo, todos)
    return json("OK");

}


export async function PATCH({params, request}) {
    console.log("Ricevuto HTTP PATCH con parametro:", params);

    let body = await request.json();

    let todo = todos.findIndex(t => t.id == params.id);

    const key = Object.keys(body);
    todos[todo][key] = body[key];

    return json('OK');
}

export async function DELETE({params, request}) {

    console.log("Ricevuto HTTP DELETE con parametro:", params);

    todos = todos.filter(t => t.id != params.id);

    return json("OK")
    
}