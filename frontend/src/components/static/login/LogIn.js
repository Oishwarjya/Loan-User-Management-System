import { useState } from 'react';
import React from "react";
import Split from '@uiw/react-split';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default function LogIn() {
    return (
        <div style={{height:"90%"}}>
            <Split disable linebar="true" mode="horizontal" style={{ height: '100%', border: '1px solid #d5d5d5', borderRadius: 3 }}>
                <div style={{ width: '50%' }}><SignUp /></div>
                <div style={{ width: '50%' }}><SignIn /></div>
            </Split>
        </div>
    );
}
