import React from 'react'
import { Box } from '@mui/material'
import { useAppDispatch } from 'app/hooks'
import { authActions } from 'features/auth/authSlice'
import { Header, SideBar} from 'components/Common'
import { styled } from '@mui/material/styles';
import { Route, Switch } from 'react-router-dom'
import Dashboard from 'features/dashboard'
import StudentFeature from 'features/student'

export function AdminLayout() {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  const BoxRoot = styled(Box)(({theme}) => ({
    display: 'grid',
    gridTemplate: 'auto 1fr',
    gridTemplateColumns: '300px 1fr',
    gridTemplateRows: '70px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh'
  }))

  const BoxHeader = styled(Box)(({theme}) => ({
    gridArea: 'header', 
  }))

  const BoxSidebar = styled(Box)(({theme}) => ({
    gridArea: 'sidebar', 
    borderRight: `1px solid ${theme.palette.divider}`
  }))

  const BoxMain = styled(Box)(({theme}) => ({
    gridArea: 'main',
    padding: theme.spacing(2, 3)
  }))

  return (
    <BoxRoot>
      <BoxHeader>
        <Header onLogOut={handleLogout}/>
      </BoxHeader>
      <BoxSidebar>
        <SideBar />
      </BoxSidebar>
      <BoxMain>
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>
          <Route path="/admin/students">
            <StudentFeature />
          </Route>
        </Switch>
      </BoxMain>
    </BoxRoot>
  )
}
