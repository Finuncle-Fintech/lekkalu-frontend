import React from 'react';
import { Link } from 'react-router-dom';

interface BreadCrumbProps {
  pageTitle: string;
  previousPageTitle?: string;
  previousPageLink?: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  pageTitle,
  previousPageTitle,
  previousPageLink,
}) => {
  return (
    <div className="w-[80%] my-4 mx-auto relative">
      <p className="flex">
        <Link to={'/'}>Home</Link>{' '}
        {previousPageTitle && previousPageLink && (
          <Link to={previousPageLink}>{` >> ${previousPageTitle}`}</Link>
        )}
        <span> {` >> ${pageTitle}`}</span>
      </p>
    </div>
  );
};

export default BreadCrumb;
