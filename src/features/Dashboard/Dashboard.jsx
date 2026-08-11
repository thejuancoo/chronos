import React from 'react'
import useAuth from '../../shared/hooks/useAuth'

export default function Dashboard() {
  const {auth} = useAuth()
  
  return (
    <div>Dashboard</div>
  )
}
