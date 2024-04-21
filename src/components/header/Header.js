import React from 'react';
import './header.css'
import { userProfileSvg } from '../../commonElements/commonSvgs';

const Header = () => {
    return (
        <div className="headerMainContainer">
            <p className="headerHeadering">💸 Expense Tracker</p>
            <div className="headerProfileCon">
                <span>User Name</span>
                {userProfileSvg}
            </div>
        </div>
    )
};

export default Header;