// Libraries
import { ComponentType } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'

// Components
import Header from 'components/Header'
import Footer from 'components/Footer'

// Styles
import './AppLayout.scss'

// Types
export interface PageProps {
  router: RouteComponentProps,
}

const AppLayout = ({ page: Page, header, ...props }: { page: ComponentType<PageProps>, path: string, header: string }) => {

  return (
    <Route
      {...props}
      render={(routeProps) =>
        <div className='AppLayout'>
          <div className={'AppLayout__header'}>
            <Header header={header} />
          </div>
          <div className={'AppLayout__body'}>
            <Page router={routeProps} />
          </div>
          <div className={'AppLayout__footer'}>
            <Footer />
          </div>
        </div>
      }
    />
  )
}

export default AppLayout
