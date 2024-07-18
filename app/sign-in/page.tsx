import { getUserFromDB } from '@/utils/db';
import React from 'react'

export default function Page() {
  async function signIn(FormData:FormData) {
    'use server'

    let email = FormData.get('email');
    let password = FormData.get('password');
    
    console.log('sign-in/page.tsx email :>> ', email);
    console.log('sign-in/page.tsx password :>> ', password);

    let user = await getUserFromDB(email, password);
    console.log('sign-in/page.tsx user :>> ', user);
    
  }
  return (
    <div>
      <h1>Sign In</h1>
      <form action={signIn}>
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
