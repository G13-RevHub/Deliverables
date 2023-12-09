import Link from "next/link";


export default function Footer() {
    return (
        <div className="bg-black text-grey text-[17px] flex justify-center items-center bottom-0 w-full h-20">
            <p className="center">Tutti i diritti sono riservati &copy;2023-2024 <br />
            <Link href="mailto:cognomeenome870@gmail.com">Se voleste contattarci</Link>
            </p>
        </div>
    )
}