import Pagination from "@/Components/pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, router, Link } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
export default function TaskTable({tasks , queryParams, hideProjectColumn = false}){
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value
        }else{
            delete queryParams[name]
        }
        router.get(route('task.index'), queryParams)
    }
    const onKeyPress = (name, e) => {
        if(e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value)
    }
    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === "asc"){
                queryParams.sort_direction = "desc";
            }else{
                queryParams.sort_direction = "asc";
            }
        }else
        {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route('task.index'), queryParams)
    }
    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 
                    dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading name="id"
                                sort_direction={queryParams.sort_direction}
                                sort_field={queryParams.sort_field}
                                sortChanged={sortChanged}
                            >ID</TableHeading>
                            
                            <th className="px-3 py-2">Image</th>
                            {!hideProjectColumn && (<th className="px-3 py-2">Project Name</th>)}
                            <TableHeading name="name"
                                sort_direction={queryParams.sort_direction}
                                sort_field={queryParams.sort_field}
                                sortChanged={sortChanged}
                            >Name</TableHeading>
                            <TableHeading name="status"
                                sort_direction={queryParams.sort_direction}
                                sort_field={queryParams.sort_field}
                                sortChanged={sortChanged}
                            >Status</TableHeading>
                            <TableHeading name="created_at"
                                sort_direction={queryParams.sort_direction}
                                sort_field={queryParams.sort_field}
                                sortChanged={sortChanged}
                            >Created Date</TableHeading>
                            <TableHeading name="due_date"
                                sort_direction={queryParams.sort_direction}
                                sort_field={queryParams.sort_field}
                                sortChanged={sortChanged}
                            >Due Date</TableHeading>
                            <th className="px-3 py-2">
                                Created By
                            </th>
                            <th className="px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 
                    dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-2"></th>
                            <th className="px-3 py-2"></th>
                             {!hideProjectColumn &&<th className="px-3 py-2"></th>}
                            <th className="px-3 py-2">
                                <TextInput 
                                className="w-full" 
                                placeholder="Task Name"
                                defaultValue={queryParams.name}
                                onBlur={e => searchFieldChanged("name" , e.target.value)}
                                onKeyPress={e => onKeyPress("name", e)}/>
                            </th>
                            <th className="px-3 py-2">
                                <SelectInput className="w-full"
                                defaultValue={queryParams.status}
                                onChange={e=> searchFieldChanged("status", e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-2"></th>
                            <th className="px-3 py-2"></th>
                            <th className="px-3 py-2"></th>
                            <th className="px-3 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map( (task) => (
                        <tr className="bg-white border-b dark:border-gray-600 dark:bg-gray-900" key={task.id}>
                            <td className="px-3 py-2">{task.id}</td>
                            <td className="px-3 py-2"><img style={{width:60}} src={task.image_path} alt="" /></td>
                            {!hideProjectColumn && <td className="px-3 py-2">{task.project.name}</td>}
                            <td className="px-3 py-2">{task.name}</td>
                            <td className="px-3 py-2">
                                <span className={"px-3 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                </span>
                            </td>
                            <td className="px-3 py-2">{task.created_at}</td>
                            <td className="px-3 py-2">{task.due_date}</td>
                            <td className="px-3 py-2">{task.created_by.name}</td>
                            <td className="px-3 py-2">
                                
                                <Link
                                    href={route("task.edit", task.id)}
                                    className="font-medium text-blue-600 dark:text-blue-900 hover:underline mx-1"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route("task.destroy", task.id)}
                                    className="font-medium text-red-600 dark:text-red-900 hover:underline mx-1"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                        
                        ))}

                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links} /> 
        
        </>
    )
}