
import React, { useContext } from 'react';
interface User {
    username: string;
    // Додайте інші поля, які вам потрібні
}

interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = React.createContext<UserContextProps | undefined>(undefined);

export default UserContext;