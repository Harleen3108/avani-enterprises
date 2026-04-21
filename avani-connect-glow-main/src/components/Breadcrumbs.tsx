import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex py-3 px-5 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-6"
    >
      <ol 
        itemScope 
        itemType="https://schema.org/BreadcrumbList" 
        className="inline-flex items-center space-x-1 md:space-x-3"
      >
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem" 
          className="inline-flex items-center"
        >
          <Link 
            to="/" 
            itemProp="item" 
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-amber-600 dark:text-gray-400 dark:hover:text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const name = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

          return (
            <li 
              key={to} 
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              <div className="flex items-center">
                <ChevronRight className="w-6 h-6 text-gray-400" />
                {last ? (
                  <span 
                    itemProp="name" 
                    className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
                  >
                    {name}
                  </span>
                ) : (
                  <Link 
                    to={to} 
                    itemProp="item" 
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-amber-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    <span itemProp="name">{name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={(index + 2).toString()} />
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
