import Button from "components/Button";
import Link from "next/link";

export default function AdminOnlyComponent() {
    return <div className="px-6 py-7 flex flex-col items-center gap-y-5">
        <h1 className="text-3xl text-white text-center">Unauthorized</h1>
        <Link href="/" passHref>
            <Button>click to go back to main page</Button>
        </Link>
    </div>
}