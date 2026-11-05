import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const Icon = ({ d, className = "" }) => (
    <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 shrink-0 fill-none stroke-current ${className}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d={d} />
    </svg>
);

const ICONS = {
    plus: "M12 5v14M5 12h14",
    calendar: "M3 5h18v16H3zM16 3v4M8 3v4M3 11h18",
    edit: "M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z",
    trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6",
};

const PRIORITIES = {
    1: { label: 'Priority 1', ring: 'border-red-500 bg-red-50', text: 'text-red-600', flag: '#dc2626' },
    2: { label: 'Priority 2', ring: 'border-orange-400 bg-orange-50', text: 'text-orange-500', flag: '#f97316' },
    3: { label: 'Priority 3', ring: 'border-blue-400 bg-blue-50', text: 'text-blue-500', flag: '#3b82f6' },
    4: { label: 'Priority 4', ring: 'border-neutral-400', text: 'text-neutral-400', flag: '#a3a3a3' },
}

const IssuesPage = ({ searchTask, addTask }) => {
    const [selectedTask, setSelectedTask] = useState("");
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editId, setEditId] = useState(null);
    const [adding, setAdding] = useState(false)
    const [priority, setPriority] = useState(4);

    const resetForm = () => {
        setEditId(null);
        setAdding(false);
        setSelectedTask("");
        setSelectedStartDate("");
        setSelectedEndDate("");
        setSelectedCategory("");
        setPriority(4);
    };

    const fetchTasks = async (query = "") => {
        try {
            const endpoint = query
                ? `${API_BASE_URL}/search-title?title=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/events`;

            const response = await axios.get(endpoint);

            if (response.status !== 200) {
                throw new Error("Failed to fetch task");
            }

            setTasks(response.data || []);
            setErrorMessage("");
        } catch (error) {
            console.error(`Error fetching tasks: ${error}`);
            setErrorMessage("There was an error fetching tasks");
        }
    };

    const createTask = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`${API_BASE_URL}/create-event`, {
                title: selectedTask,
                starts_at: selectedStartDate,
                ends_at: selectedEndDate,
                category: selectedCategory,
            });

            resetForm();
            fetchTasks(searchTask);
        } catch (error) {
            console.error(`Error creating task: ${error}`);
            setErrorMessage("There was an error creating task");
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/delete-event/${id}`);
            fetchTasks(searchTask);
        } catch (error) {
            console.error(`Error deleting task: ${error}`);
            setErrorMessage("There was an error deleting task");
        }
    };

    const editTask = (task) => {
        setAdding(false);
        setEditId(task.id);
        setSelectedTask(task.title);
        setSelectedStartDate(String(task.starts_at));
        setSelectedEndDate(String(task.ends_at));
        setSelectedCategory(task.category);
    };

    const updateTask = async (event, id) => {
        event.preventDefault();

        try {
            await axios.put(`${API_BASE_URL}/update-event/${id}`, {
                title: selectedTask,
                starts_at: selectedStartDate,
                ends_at: selectedEndDate,
                category: selectedCategory,
            });

            resetForm();
            fetchTasks(searchTask);
        } catch (error) {
            console.error(`Error updating task: ${error}`);
            setErrorMessage("There was an error updating task");
        }
    };

    useEffect(() => {
        fetchTasks(searchTask);
    }, [searchTask]);

    const visibleTasks = searchTask === null ? [] : tasks;

    const field =
        "rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-600 outline-none focus:border-[#db4c3f]";

    const form = (
        <form
            onSubmit={editId ? (e) => updateTask(e, editId) : createTask}
            onKeyDown={(e) => e.key === "Escape" && resetForm()}
            className="rounded-xl border border-neutral-300 bg-white p-3 shadow-sm"
        >
            <input
                autoFocus
                type="text"
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                placeholder="Task name"
                required
                className="w-full text-[15px] font-semibold outline-none placeholder:font-normal placeholder:text-neutral-400"
            />
            <input
                type="text"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                placeholder="Category"
                required
                className="mt-1 w-full text-sm outline-none placeholder:text-neutral-400"
            />

            <div className="mt-2 flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-1.5 text-xs text-neutral-500">
                    Start
                    <input
                        type="date"
                        value={selectedStartDate}
                        onChange={(e) => setSelectedStartDate(e.target.value)}
                        required
                        className={field}
                    />
                </label>
                <label className="flex items-center gap-1.5 text-xs text-neutral-500">
                    End
                    <input
                        type="date"
                        value={selectedEndDate}
                        onChange={(e) => setSelectedEndDate(e.target.value)}
                        className={field}
                    />
                </label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    className="rounded-md border border-neutral-300 px-2 py-1 text-xs outline-none focus:border-brand"
                    aria-label="Priority"
                    style={{ color: PRIORITIES[priority].flag }}
                >
                    {Object.entries(PRIORITIES).map(([k, p]) => (
                        <option key={k} value={k} style={{ color: '#262626' }}>{p.label}</option>
                    ))}
                </select>
            </div>

            <div className="mt-3 flex justify-end gap-2 border-t border-neutral-100 pt-3">
                <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-md bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-[#db4c3f] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#c53727]"
                >
                    {editId ? "Save" : "Add task"}
                </button>
            </div>
        </form>
    );

    return (
        <main className="h-screen flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl px-5 pb-24 pt-5 md:px-10 md:pt-10">
                <header className="mb-5">
                    <h1 className="text-2xl font-bold leading-tight">Issues</h1>
                    <p className="text-xs text-neutral-500">
                        {visibleTasks.length} task{visibleTasks.length === 1 ? "" : "s"}
                    </p>
                    {addTask && <p className="mt-1 text-sm text-neutral-600">{addTask}</p>}
                </header>

                {errorMessage && (
                    <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                        {errorMessage}
                    </p>
                )}

                <ul>
                    {visibleTasks.map((task) =>
                        editId === task.id ? (
                            <li key={task.id} className="py-2">
                                {form}
                            </li>
                        ) : (
                            <li
                                key={task.id}
                                className="group flex items-start gap-3 border-b border-neutral-100 py-2.5"
                            >
                                

                                <div className="min-w-0 flex-1 cursor-pointer" onClick={() => editTask(task)}>
                                    <p className="text-[15px] leading-snug">{task.title}</p>
                                    <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs">
                                        <span className="flex items-center gap-1 text-purple-700">
                                            <Icon d={ICONS.calendar} className="!h-3 !w-3" />
                                            {task.starts_at} → {task.ends_at}
                                        </span>
                                        {task.category && (
                                            <span className="ml-auto rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-500">
                                                {task.category}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-1 opacity-0 transition focus-within:opacity-100 group-hover:opacity-100">
                                    <button
                                        onClick={() => editTask(task)}
                                        aria-label="Edit task"
                                        className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                                    >
                                        <Icon d={ICONS.edit} />
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        aria-label="Delete task"
                                        className="rounded p-1 text-neutral-400 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Icon d={ICONS.trash} />
                                    </button>
                                </div>
                            </li>
                        )
                    )}
                </ul>

                {visibleTasks.length === 0 && !adding && !errorMessage && (
                    <div className="mt-16 text-center">
                        <p className="text-base font-semibold">No tasks yet</p>
                        <p className="mt-1 text-sm text-neutral-500">Add your first task to get going.</p>
                    </div>
                )}

                <div className="mt-2">
                    {adding && !editId ? (
                        form
                    ) : (
                        <button
                            onClick={() => {
                                resetForm();
                                setAdding(true);
                            }}
                            className="group flex items-center gap-2 py-2 text-sm text-neutral-500 hover:text-[#db4c3f]"
                        >
                            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[#db4c3f] group-hover:bg-[#db4c3f] group-hover:text-white">
                                <Icon d={ICONS.plus} className="!h-4 !w-4" />
                            </span>
                            Add task
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
};

export default IssuesPage;