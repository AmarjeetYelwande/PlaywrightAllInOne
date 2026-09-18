import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NotificationProps {
  setCount: () => void;
  count?: number;
}

const Notification: React.FC<NotificationProps> = ({ setCount, count = 0 }) => {
  useEffect(() => {
    setCount();
  }, [setCount]);

  const alertIcon = count > 0 ? (
    <i className="fa fa-inbox" style={{ fontSize: "1.5rem" }}>
      <span className="notification">{count}</span>
    </i>
  ) : (
    <i className="fa fa-inbox" style={{ fontSize: "1.5rem" }}></i>
  );
  
  return <Link className="nav-link" to="/admin/messages">{alertIcon}</Link>;
};

export default Notification;
