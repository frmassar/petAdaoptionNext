import Link from "next/link";

export default function Menu() {
  return (
    <div className="absolute top-0 h-24 w-full flex red justify-between items-center p-8">
      <p className=" text-3xl">Petfinder</p>
      <div className="flex items-center">
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/donate">
              <a>Donate</a>
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
