import { useEffect, useRef } from "react";

const SearchModal = ({ isOpen, onClose, searchTask, setSearchTask }) => {
    const inputRef = useRef(null);

    // Focus the input when opened, close on Escape
    useEffect(() => {
        if (!isOpen) return;
        inputRef.current?.focus();

        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="search-modal fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[15vh]"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Search tasks"
        >
            <div
                className="search-modal-container w-full max-w-xl overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="flex items-center gap-3 px-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 shrink-0 text-neutral-400"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search tasks by title…"
                        className="search-control w-full bg-transparent py-4 text-[15px] outline-none placeholder:text-neutral-400"
                        value={searchTask ?? ""}
                        onChange={(event) => setSearchTask(event.target.value)}
                    />

                    {searchTask && (
                        <button
                            type="button"
                            onClick={() => { setSearchTask(""); inputRef.current?.focus(); }}
                            className="shrink-0 text-xs text-neutral-400 hover:text-neutral-700"
                        >
                            Clear
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close search"
                        className="close-modal shrink-0 rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </form>

                <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50 px-4 py-2 text-xs text-neutral-500">
                    <span>Results update on the Issues page as you type</span>
                    <span>
                        <kbd className="rounded border border-neutral-300 bg-white px-1.5 py-0.5 font-sans">Enter</kbd> to apply ·{" "}
                        <kbd className="rounded border border-neutral-300 bg-white px-1.5 py-0.5 font-sans">Esc</kbd> to close
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;