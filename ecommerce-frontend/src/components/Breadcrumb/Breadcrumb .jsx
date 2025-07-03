import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="text-sm text-gray-600 flex items-center">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index !== items.length - 1 ? (
            <>
              <Link to={item.href} className="text-[#2fd7c3] hover:underline">
                {item.label}
              </Link>
              <span className="mx-2">{'>'}</span>
            </>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;