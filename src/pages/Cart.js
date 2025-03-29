import React, {
  Fragment,
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Box from '@mui/material/Box';
import {
  Card, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button,
} from '@mui/material';

import { Clear, Remove, Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { changeQuantity, deleteCartRequest, getCartsRequest } from '../store/actions/products';

function Cart() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const { cart, cartLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getCartsRequest());
  }, []);

  const onConfirm = useCallback(() => {
    dispatch(deleteCartRequest(open));
    setOpen(null);
  }, [open]);

  const handleChangeQuantity = (cartId, productId, newQuantity) => {
    dispatch(changeQuantity({ cartId, productId, newQuantity }));
  };

  const totalPrice = useMemo(() => (
    cart?.reduce((sum, c) => sum + (c.products.reduce((productSum, p) => productSum + p.price * p.quantity, 0)), 0)
  ), [cart]);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Cart
      </Typography>

      {cartLoading
        ? (
          <div style={{
            width: '100%',
            height: 'calc(100vh - 158px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <CircularProgress size={60} />
          </div>
        )

        : (
          <Box sx={{ mt: '20px' }}>
            <Card sx={{ width: '100%' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {cart.map((c) => (
                    <Fragment key={c.id}>
                      <TableRow style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                        <TableCell colSpan={5} style={{ fontSize: '16px' }}>
                          <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                          }}
                          >
                            <span>
                              Cart #
                              {c.id}
                            </span>

                            <IconButton onClick={() => setOpen(c.id)} color="error">
                              <Clear />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>

                      {c.products.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell>{p.title}</TableCell>

                          <TableCell>
                            $
                            {p.price.toFixed(2)}
                          </TableCell>

                          <TableCell>
                            <div style={{
                              display: 'flex', alignItems: 'center', minWidth: '100px',
                            }}
                            >
                              <IconButton
                                onClick={() => handleChangeQuantity(c.id, p.productId, p.quantity - 1)}
                                size="small"
                              >
                                <Remove />
                              </IconButton>

                              <span style={{ margin: '0 8px', fontWeight: 'bold' }}>{p.quantity}</span>

                              <IconButton
                                onClick={() => handleChangeQuantity(c.id, p.productId, p.quantity + 1)}
                                size="small"
                              >
                                <Add />
                              </IconButton>
                            </div>
                          </TableCell>

                          <TableCell>
                            $
                            {(p.price * p.quantity).toFixed(2)}
                          </TableCell>

                          <TableCell />
                        </TableRow>
                      ))}
                    </Fragment>

                  ))}

                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="right"
                      sx={{ fontWeight: 'bold', fontSize: '20px', paddingRight: '70px' }}
                    >
                      {`Total: ${totalPrice.toFixed(2)}`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Box>
        )}

      <Dialog open={!!open} onClose={() => setOpen(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Cart;
