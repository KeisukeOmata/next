import Link from 'next/link'
import { useCart } from '../../hooks/useCart'
import styles from '../../styles/components/layouts/SiteHeader.module.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Header: React.FC = () => {
  const { quantity } = useCart()
  return (
    <header className={styles.siteHeader}>
      <AppBar position="static">
        <Toolbar>
          <Link href={'/'}>
            <Typography variant="h6">next_e-commerce</Typography>
          </Link>
          <Link href={'/cart'}>
            <Button color="inherit">Cart(item quantity: {quantity})</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
