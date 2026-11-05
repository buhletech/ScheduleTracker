import { useState, useEffect } from "react";

const COLORS = [
    { name: "Berry Red", value: "#b8255f" },
    { name: "Red", value: "#db4035" },
    { name: "Orange", value: "#ff9933" },
    { name: "Yellow", value: "#fad000" },
    { name: "Olive Green", value: "#afb83b" },
    { name: "Lime Green", value: "#7ecc49" },
    { name: "Green", value: "#299438" },
    { name: "Mint Green", value: "#6accbc" },
    { name: "Teal", value: "#158fad" },
    { name: "Sky Blue", value: "#14aaf5" },
    { name: "Light Blue", value: "#96c3eb" },
    { name: "Blue", value: "#4073ff" },
    { name: "Grape", value: "#884dff" },
    { name: "Violet", value: "#af38eb" },
    { name: "Lavender", value: "#eb96eb" },
    { name: "Magenta", value: "#e05194" },
    { name: "Salmon", value: "#ff8d85" },
    { name: "Charcoal", value: "#808080" },
    { name: "Grey", value: "#b8b8b8" },
    { name: "Taupe", value: "#ccac93" },
];

const LAYOUTS = ["List", "Board", "Calendar"];
const fieldClass = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#202020] placeholder-gray-400 focus:border-gray-500 focus:outline-none";

const ProjectModdal = ({isOpen, onClose, onSubmit, workspaces = [], projects = [],}) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [color, setColor] = useState("#808080");
    const [workspace, setWorkspace] = useState("");
    const [parentProject, setParentProject] = useState("");
    const [layout, setLayout] = useState("List");

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit({ name: name.trim(), desc, color, workspace, parentProject, layout });
        setName("");
        setDesc("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-xl bg-white shadow-2xl overflow-hidden"
            >
                <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-base font-bold text-[#202020]">Add project</h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
                </div>

                <div className="px-6 py-4 max-h-[70vh] overflow-y-auto space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-[#202020]">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Project name"
                            maxLength={120}
                            autoFocus
                            className={fieldClass}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-[#202020]">Description</label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Description"
                            rows={2}
                            className={`${fieldClass} resize-none`}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-[#202020]">Color</label>
                        <select
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className={fieldClass}
                        >
                            {COLORS.map((c) => (
                                <option key={c.value} value={c.value}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-[#202020]">Parent project</label>
                        <select
                            value={parentProject}
                            onChange={(e) => setParentProject(e.target.value)}
                            className={fieldClass}
                        >
                            <option value="">No parent</option>
                            {projects.map((p) => (
                                <option key={p.id} value={p.id}>{p.projectname}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-[#202020]">Layout</label>
                        <div className="flex gap-2">
                            {LAYOUTS.map((l) => (
                                <button
                                    type="button"
                                    key={l}
                                    onClick={() => setLayout(l)}
                                    className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                                        layout === l
                                            ? "border-[#db4c3f] bg-[#fff0ee] font-semibold text-[#db4c3f]"
                                            : "border-gray-300 text-[#202020] hover:bg-gray-50"
                                    }`}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4 bg-gray-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-[#202020] hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!name.trim()}
                        className="rounded-lg bg-[#db4c3f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c53727] disabled:opacity-50"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectModdal;