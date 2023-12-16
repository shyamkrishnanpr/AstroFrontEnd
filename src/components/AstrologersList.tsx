// AstrologersList.tsx
import React, { useEffect } from "react";
import { useGetAstrologersQuery } from "../api/api";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

interface Astrologer {
  _id: string;
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
}

const columns: GridColDef[] = [
  { field: "_id", headerName: "", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "gender", headerName: "Gender", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "languages", headerName: "Languages", width: 250 },
  { field: "specialties", headerName: "Specialties", width: 250 },
];

const AstrologersList: React.FC = () => {
  const navigate = useNavigate();

  const { data: astrologers, isLoading, refetch } = useGetAstrologersQuery([]);

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };
    fetchData();
  }, [refetch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!astrologers || astrologers.length === 0) {
    return <p>No astrologers available.</p>;
  }

  const rows = astrologers.map((astrologer: Astrologer) => ({
    id: astrologer._id,
    name: astrologer.name,
    gender: astrologer.gender,
    email: astrologer.email,
    languages: astrologer.languages.join(", "),
    specialties: astrologer.specialties.join(", "),
  }));

  const handleEditClick = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
    <div style={{ padding: "16px", overflowX: "auto"}}>
      <h1>Astrologers List</h1>

      <DataGrid
        rows={rows}
        columns={columns.concat({
          field: "edit",
          headerName: "Edit",
          width: 100,
          renderCell: (params) => (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditClick(params.row.id)}
            >
              Edit
            </Button>
          ),
        })}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
      />

</div>
    </>
  );
};

export default AstrologersList;
