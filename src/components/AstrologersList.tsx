// AstrologersList.tsx
import React from "react";
import { useGetAstrologersQuery } from "../api";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Astrologer {
  _id: string;
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
}

const handleEditClick = (id: string) => {
  // Handle the "Edit" button click, e.g., navigate to an edit page
  console.log(`Edit button clicked for Astrologer ID: ${id}`);
};

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "gender", headerName: "Gender", width: 120 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "languages", headerName: "Languages", width: 200 },
  { field: "specialties", headerName: "Specialties", width: 200 },
  {
    field: "edit",
    headerName: "Edit",
    width: 100,
    renderCell: (params) => (
      <button
        onClick={() => handleEditClick(params.row.id)}
        style={{ cursor: "pointer" }}
      >
        Edit
      </button>
    ),
  },
];

const AstrologersList: React.FC = () => {
  
  const { data: astrologers, isLoading } = useGetAstrologersQuery({});

  console.log(astrologers);

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

  return (
    <>
      <h1>Astrologers List</h1>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default AstrologersList;
