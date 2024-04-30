import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center pl-10 pr-10 w-full md:h-14 h-12 bg-black text-white">
      <div className="flex items-center gap-12">
        <Link href="/">
          <h1 className="text-xl cursor-pointer">Staff Details</h1>
        </Link>

        <Link href="/staff">Staff</Link>
        <Link href="/staff/add">Add</Link>
        <Link href="/staff/list">Staff-List</Link>
      </div>
    </header>
  );
}

export default Header;
