import React from 'react';
import './header.css'
import { userProfileSvg } from '../../commonElements/commonSvgs';
import { userLogOut } from '../../apis';

const Header = ({userHomeDetails, onLogOut}) => {

    const onSelect = (identifier) =>{
     
    }

    return (
        <div className="headerMainContainer">
            <p className="headerHeadering">💸 Expense Tracker</p>

            <div className="headerProfileMianCon">
                <div className="headerProfileCon">
                    <span>{userHomeDetails && userHomeDetails.name ? userHomeDetails.name : "" }</span>
                    {userProfileSvg}
                </div>

                <div className="profilePopupCon">
                    <p onClick={()=>onLogOut("logout")}>Log out</p>
                </div>
            </div>
        </div>
    )
};

export default Header;