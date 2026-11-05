import { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchModal from "./SearchModal.jsx";

const Icon = ({ d, className = "" }) => (
    <svg viewBox="0 0 24 24" className={`h-[18px] w-[18px] shrink-0 fill-none stroke-current ${className}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);

const ICONS = {
    search: "M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z",
    issues: "M12 8v4M12 16h.01M12 22a10 10 0 100-20 10 10 0 000 20z",
    plus: "M12 5v14M5 12h14",
    chevron: "M6 9l6 6 6-6",
};

const NavBar = ({ searchTask, setSearchTask, projects = [], onOpenAddProject }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [showProjects, setShowProjects] = useState(true);

    const row = (active) =>
        `flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition ${
            active
                ? "bg-[#db4c3f]/10 font-semibold text-[#db4c3f]"
                : "text-neutral-700 hover:bg-neutral-200/60"
        }`;

    return (
        <>
            <aside className="flex h-screen w-72 shrink-0 flex-col bg-[#fcfaf8] px-3 py-4 border-r border-neutral-200/60">
                {/* User */}
                <div className="mb-4 flex items-center gap-2.5 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#db4c3f] text-sm font-bold text-white">
                        B
                    </div>
                    <span className="truncate text-sm font-semibold">Buhle Brian Mndze</span>
                </div>

                {/* Main nav */}
                <nav className="space-y-0.5">
                    <button onClick={() => setShowSearch(true)} className={row(false)}>
                        <Icon d={ICONS.search} />
                        <span className="flex-1">Search</span>
                    </button>

                    <NavLink to="/issues" className={({ isActive }) => row(isActive)}>
                        <Icon d={ICONS.issues} />
                        <span className="flex-1">Issues</span>
                    </NavLink>
                </nav>

                {/* Projects Header */}
                <div className="mt-6 flex items-center justify-between px-2.5">
                    {/* Replaced NavLink with span so it does not redirect or act as a link */}
                    <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 select-none">
                        My Projects
                    </span>
                    <div className="flex items-center gap-0.5">
                        {/* Plus button triggers the add project modal */}
                        <button
                            type="button"
                            onClick={onOpenAddProject}
                            aria-label="Add project"
                            className="add-project-btn rounded p-1 text-neutral-500 hover:bg-neutral-200/70 hover:text-neutral-800 cursor-pointer transition"
                        >
                            <Icon d={ICONS.plus} className="!h-4 !w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowProjects((s) => !s)}
                            aria-label={showProjects ? "Hide projects" : "Show projects"}
                            className="hide-projects rounded p-1 text-neutral-500 hover:bg-neutral-200/70 hover:text-neutral-800 cursor-pointer transition"
                        >
                            <Icon
                                d={ICONS.chevron}
                                className={`!h-4 !w-4 transition-transform ${showProjects ? "" : "-rotate-90"}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Projects List */}
                {showProjects && (
                    <div className="mt-1 flex-1 space-y-0.5 overflow-y-auto">
                        {projects.map((p) => (
                            <NavLink key={p.id} to={`/projects/${p.id}`} className={({ isActive }) => row(isActive)}>
                                <span
                                    className="flex h-[18px] w-[18px] items-center justify-center text-base font-bold"
                                    style={{ color: p.colour || p.color || "#64748b" }}
                                >
                                    #
                                </span>
                                <span className="truncate">{p.projectname || p.name}</span>
                            </NavLink>
                        ))}
                        {projects.length === 0 && (
                            <p className="px-2.5 py-2 text-xs text-neutral-400">No projects yet.</p>
                        )}
                    </div>
                )}
            </aside>

            <SearchModal
                isOpen={showSearch}
                onClose={() => setShowSearch(false)}
                searchTask={searchTask}
                setSearchTask={setSearchTask}
            />
        </>
    );
};

export default NavBar;