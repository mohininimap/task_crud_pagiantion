import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ButtonGroup, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, loadProducts } from "../redux/action";
import AddIcon from "@mui/icons-material/Add";
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ImportExportRoundedIcon from "@mui/icons-material/ImportExportRounded";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import {Modal,Box,Typography} from "@mui/material";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

import { useNavigate } from "react-router-dom";
import "./home.css";
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: "#E0E0E0",
    backgroundColor: "#F7F7F7",

    color: "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: "#EEEEEE",
  },
}));

const useStyles = makeStyles({
  table: {
    marginTop: 1,
    minWidth: 900,
  },
});

const Home = () => {
  const [image,setImage]=useState()
  const [open,setOpen]=useState(false);
  const [editopen,setEditOpen]=useState(false);

  const [prod, setProd] = useState([]);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.data);

  useEffect(() => {
    
    dispatch(loadProducts());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user ?"))
      dispatch(deleteProduct(id));
  };

  const selectPageHandler = (selectedPage) => {
    console.log("*********" + selectedPage);
    if (selectedPage >= 1 && selectedPage <= products.length / 10)
      setPage(selectedPage);
  };

  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <IconButton

         onClick={()=>setOpen(true)}
          // onClick={() => navigate("/addProduct")}
          variant="contained"
          color="primary"
          size="small"
        >
          {" "}
          <AddIcon />
        </IconButton>

        <IconButton>
          <ImportExportIcon />
        </IconButton>
      </div>

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          sx={{ minWidth: 700, textAlign: "center" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <input type="checkbox" />
              </StyledTableCell>
              <StyledTableCell className="title" align="left">Id</StyledTableCell>
              <StyledTableCell className="title" align="left">Name</StyledTableCell>
              <StyledTableCell className="title" align="left">Karat</StyledTableCell>
              <StyledTableCell className="title" align="left">Weight</StyledTableCell>
              <StyledTableCell className="title" align="left">Price</StyledTableCell>
              <StyledTableCell className="title" align="left">Image</StyledTableCell>
              <StyledTableCell className="title" align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.slice(page * 10 - 10, page * 10).map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell component="th" scope="row">
                    <input type="checkbox" />
                  </StyledTableCell>

                  <StyledTableCell align="left" component="th" scope="row">
                    {product.id}
                  </StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                    {product.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.karat}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.weight}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.price}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <input type="file" />
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {" "}
                    <div className={classes.buttonStyles}>
                      <Fab
                        size="small"
                        onClick={() => handleDelete(product.id)}
                        aria-label="add"
                      >
                        <DeleteIcon size="small" color="error" />
                      </Fab>

                      {/* <Fab
                      sx={{marginLeft:"12px"}}
                        size="small"
                        onClick={() => {
                          navigate(`/editProduct/${ .id}`);
                        }}
                        aria-label="add"
                      >
                        <EditIcon size="small" color="primary" />
                      </Fab> */}



                        <Fab
                      sx={{marginLeft:"12px"}}
                        size="small"
                        onClick={()=>setEditOpen(true)}

                        
                        aria-label="add"
                      >
                        <EditIcon size="small" color="primary" />
                      </Fab>

                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          {products.length && products.length > 0 && (
            <div className="pagination">
              <span
                onClick={() => selectPageHandler(page - 1)}
                className={page > 1 ? "" : "pagination__disable"}
              >
                ◀
              </span>
              {
                //so its give a new in a array inside this products =>100
                [...Array(Math.floor(products.length / 10))].map((_, i) => {
                  //i start from 0
                  return (
                    <span
                      //current index and page is match then
                      className={page === i + 1 ? "pagination__selected" : ""}
                      onClick={() => selectPageHandler(i + 1)}
                      key={i}
                    >
                      {i + 1}
                    </span>
                  );
                })
              }

              <span
                onClick={() => selectPageHandler(page + 1)}
                className={
                  page < Math.floor(products.length / 10)
                    ? ""
                    : "pagination__disable"
                }
              >
                ▶
              </span>
            </div>
          )}
        </div>
      </TableContainer>
      <Modal open={open} onClose={()=>setOpen(false)}>
       <Box position="absolute" top="10%" left="30%">
       
        <AddProduct/>
       </Box>
      </Modal>


      <Modal open={editopen} onClose={()=>setOpen(false)}>
       <Box position="absolute" top="10%" left="30%">
       
        <EditProduct setEditOpen={setEditOpen} id={products.id}/>
       </Box>
      </Modal>
    </div>
  );
};

export default Home;
