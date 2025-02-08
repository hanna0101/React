import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { API } from '../constants/constants.ts';

export const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pageId } = useParams();

  useEffect(() => {
    if (location.pathname === '/') {
      const currentPage = Number(pageId) || API.FIRST_PAGE;
      navigate(`/page/${currentPage}`);
    }
  }, [navigate, pageId, location.pathname]);

  return <Outlet />;
};
