'use client'
// app/page.tsx

import { useEffect } from "react";
import {
  signIn
} from 'next-auth/react'

export default function Home() {

  useEffect(() => {
    const signin = async () => {
      await signIn()
    }

    signin()
  },[])

  return (
    <>
    </>

  )
}