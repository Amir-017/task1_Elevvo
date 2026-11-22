export const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
            <a href="/" className="text-white hover:text-gray-300">
                Home
            </a>
        </li>
        <li>
            <a href="/projects" className="text-white hover:text-gray-300">
                Projects
            </a>
        </li>
        <li>
            <a href="/profile" className="text-white hover:text-gray-300"></a>
                Profile
        </li>
      </ul>
    </div>
  )
}