import { useState } from "react";

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

const ProjectUpdateModal = ({isOpen, onClose, onUpdate, projectToEdit = {}, projects = [],}) => {
    // Initialize state directly from props once when the component mounts/opens
    const [projectname, setProjectname] = useState(projectToEdit?.projectname || "");
    const [description, setDescription] = useState(projectToEdit?.description || "");
    const [colour, setColour] = useState(projectToEdit?.colour || "#808080");
    const [workspace, setWorkspace] = useState(projectToEdit?.workspace || "");
    const [parentProjectId, setParentProjectId] = useState(projectToEdit?.parentProjectId?.id || "");
    const [layout, setLayout] = useState(projectToEdit?.layout || "List");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectname.trim()) return;
        onUpdate({
            id: projectToEdit.id,
            projectname: projectname.trim(),
            description,
            colour,
            workspace,
            layout,
            parentProjectId: parentProjectId ? { id: Number(parentProjectId) } : null,
        });
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-24"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-xl bg-white shadow-2xl"
            >
                <div className="border-b border-gray-100 px-6 py-4">
                    <h2 className="text-base font-bold text-[#202020]">Edit project</h2>
                </div>

                <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                    <ul className="space-y-4">
                        <li>
                            <label className="mb-1 block text-sm font-semibold text-[#202020]">Name</label>
                            <input
                                type="text"
                                value={projectname}
                                onChange={(e) => setProjectname(e.target.value)}
                                placeholder="Project name"
                                maxLength={120}
                                autoFocus
                                className={fieldClass}
                            />
                        </li>

                        <li>
                            <label className="mb-1 block text-sm font-semibold text-[#202020]">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                rows={2}
                                className={`${fieldClass} resize-none`}
                            />
                        </li>

                        <li>
                            <label className="mb-1 block text-sm font-semibold text-[#202020]">Colour</label>
                            <div className="relative">
                                <span
                                    className="pointer-events-none absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
                                    style={{ backgroundColor: colour }}
                                />
                                <select
                                    value={colour}
                                    onChange={(e) => setColour(e.target.value)}
                                    className={`${fieldClass} pl-8`}
                                >
                                    {COLORS.map((c) => (
                                        <option key={c.value} value={c.value}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </li>

                        <li>
                            <label className="mb-1 block text-sm font-semibold text-[#202020]">Parent Project</label>
                            <select
                                value={parentProjectId}
                                onChange={(e) => setParentProjectId(e.target.value)}
                                className={fieldClass}
                            >
                                <option value="">No parent</option>
                                {projects.filter(p => p.id !== projectToEdit?.id).map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.projectname}
                                    </option>
                                ))}
                            </select>
                        </li>

                        <li>
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
                        </li>
                    </ul>
                </div>

                <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-[#202020] hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!projectname.trim()}
                        className="rounded-lg bg-[#db4c3f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c53727] disabled:opacity-50"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectUpdateModal;