import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const CompletedTask = () => {

    const { data: myAllTask = [], isLoading, refetch } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myTask`)
            const data = await res.json()
            return data;
        }
    });



    const handleDeletingMyTask = _id => {
        const agreed = window.confirm('Are you sure you want to delete')
        if (agreed) {

            fetch(`http://localhost:5000/myTask/${_id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success(`Task deleted successfully`)
                        refetch();
                    }

                })
        }
    };



    if (isLoading) {
        return <Loading></Loading>
    }

    if (!myAllTask.length) {
        return <div className='p-5 mt-8 md:pb-44 flex justify-center'>
            <h1 className='text-3xl text-yellow-500'>No Task Added!.
                <span className='text-blue-500 underline'
                ><Link to='/addTask'> Please add any Task</Link></span>
            </h1>
        </div>
    };

    return (
        <div className="container md:py-20 p-2 mx-auto sm:p-4 dark:text-gray-100">
            <h2 className="mb-8 text-2xl text-center font-semibold leading-tight">Completed Task</h2>
            <div className="overflow-x-auto">
                <table className="w-full p-6 text-sm text-left">
                    <colgroup>
                        <col className="w-5" />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-5" />
                    </colgroup>
                    <thead>
                        <tr className="dark:bg-gray-700 bg-gray-400">
                            <th className="p-3"></th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody className="border dark:bg-gray-900 dark:border-gray-700">
                        {
                            myAllTask?.map((task, i) => <tr key={task._id} className='border'>
                                <td className="px-3 text-2xl font-medium dark:text-gray-400">{i + 1}</td>
                                <td className="px-3 py-2">
                                    <p>{task.title}</p>
                                </td>
                                <td className="px-3 py-2">
                                    <div className="avatar">
                                        <div className="w-24 rounded-lg">
                                            <img src={task.image} className='w-24 h-20' alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-2">
                                    <p>{task.description}</p>
                                </td>
                                <td className="px-3 py-2">
                                {
                                    task.completed ==="true" ?
                                    <button className='px-2 py-3 rounded bg-green-500 text-white'>Completed</button>
                                    :
                                    <Link to='/myTask'>
                                    <button className='px-2 py-3 rounded bg-green-500 text-white'>Not Completed</button>
                                    </Link>
                                }

                                </td>
                                <td className="px-3 py-2">
                                    {
                                        task.completed ==='true' ? 
                                        <button onClick={() => handleDeletingMyTask(task._id)}
                                            className='px-2 py-3 rounded bg-red-500 text-white'>Delate</button>
                                            :
                                            ''
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default CompletedTask;