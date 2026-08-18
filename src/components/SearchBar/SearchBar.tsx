import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

type SearchBarProps = {
    onSubmit: (query: string) => void;
};

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const handleSearch = (formData: FormData) => {
        const query = formData.get('query') as string;
        if (!query.trim()) {
            toast.error("Please enter your search query.");
            return;
        }
        onSubmit(query.trim());
    };

    return (
        <header className={css.header}>
            <div className={css.container}>
                <form className={css.form} action={handleSearch}>
                    <input
                        className={css.input}
                        type="text"
                        name="query"
                        placeholder="Search movies..."
                    />
                    <button className={css.button} type="submit">Search</button>
                </form>
            </div>
        </header>
    );
}
