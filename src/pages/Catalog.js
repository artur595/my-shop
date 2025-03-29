import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Box from '@mui/material/Box';
import {
  Card, CardActionArea, CardContent, CardMedia, IconButton, InputAdornment, Rating, TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getCategoriesRequest, getProductsRequest } from '../store/actions/products';
import Api from '../Api';

function Catalog() {
  const dispatch = useDispatch();

  const { products, categories } = useSelector((state) => state.products);

  const [searchValue, setSearchValue] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');

  const [loading, loadingToggle] = useState(true);

  useEffect(() => {
    (async () => {
      loadingToggle(true);
      const requests = [dispatch(getProductsRequest(currentCategory))];

      if (!categories.length) {
        requests.push(dispatch(getCategoriesRequest()));
      }

      await Promise.all(requests);
      loadingToggle(false);
    })();
  }, [currentCategory]);

  const addToCart = useCallback(async (product) => {
    try {
      await Api.addToCart({
        id: 0,
        userId: 5,
        products: [product],
      });

      toast.success('Successfully added to cart');
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const filteredProducts = useMemo(() => (
    products.filter((product) => product.title.toLowerCase().includes(searchValue.toLowerCase()))
  ), [products, searchValue]);

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center', display: 'flex', gap: 2,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchValue}
          onChange={({ target }) => setSearchValue(target.value)}
          size="small"
          sx={{ width: 400, height: 40 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <Select
          variant="outlined"
          value={currentCategory}
          onChange={({ target }) => setCurrentCategory(target.value)}
          sx={{
            width: 250, height: 40,
          }}
        >
          <MenuItem value="">All Categories</MenuItem>

          {categories.map((category) => (
            <MenuItem
              key={category}
              value={category}
              sx={{ textTransform: 'capitalize' }}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {loading
        ? (
          <div style={{
            width: '100%',
            height: 'calc(100vh - 164px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <CircularProgress size={60} />
          </div>
        )

        : (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 5,
              mt: 5,
            }}
          >
            {filteredProducts.map((product) => (
              <Card
                sx={{
                  minWidth: 250,
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={product.id}
              >
                <CardActionArea>
                  <CardMedia
                    sx={{ objectFit: 'contain', p: 1 }}
                    component="img"
                    height="150"
                    image={product.image}
                    alt={product.title}
                  />

                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                      }}
                    >
                      {product.description}
                    </Typography>

                    <Rating
                      name="half-rating-read"
                      defaultValue={product?.rating?.rate}
                      precision={0.1}
                      readOnly
                    />

                    <Typography
                      variant="body2"
                      gutterBottom
                      component="div"
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                      }}
                    >
                      {product.description}
                    </Typography>

                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span>
                        $
                        {product.price}
                      </span>

                      <IconButton onClick={() => addToCart(product)}>
                        <ShoppingCartIcon />
                      </IconButton>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}
    </Box>
  );
}

export default Catalog;
