import { useEffect, useState } from "react";
import "./App.css";
import data, { countryList } from "./data/users";

const App = () => {
    const [userData, setUserData] = useState(data);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [genderFilter, setGenderFilter] = useState("All");
    const [countryFilter, setCountruFilter] = useState("All");

    useEffect(() => {
        setUsers(() => {
            const updatedUsers = userData.slice(
                (currentPage - 1) * itemsPerPage,
                (currentPage - 1) * itemsPerPage + itemsPerPage
            );
            return updatedUsers;
        });
    }, [userData, searchTerm, itemsPerPage, currentPage]);

    useEffect(() => {
        setTotalPage(Math.ceil(userData.length / itemsPerPage));
    }, [userData, searchTerm]);

    useEffect(() => {
        if (searchTerm !== "") {
            setUserData((prev) => {
                return prev.filter((user) => {
                    return user.username
                        .toLowerCase()
                        .includes(searchTerm.toLocaleLowerCase());
                });
            });
        } else {
            setUserData(data);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (genderFilter === "All") {
            setUserData(data);
        } else {
            setCountruFilter("All");
            setUserData(() => {
                return data.filter((user) => user.gender === genderFilter);
            });
        }
    }, [genderFilter]);

    useEffect(() => {
        if (countryFilter === "All") {
            setUserData(data);
        } else {
            setGenderFilter("All");
            setUserData(() => {
                return data.filter((user) => user.country === countryFilter);
            });
        }
    }, [countryFilter]);

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // reset to first page
    };

    const sortAscending = () => {
        setUserData((prev) => {
            const temp = [...prev];

            temp.sort((a, b) => {
                if (a.username < b.username) {
                    return -1;
                }
                if (a.username > b.username) {
                    return 1;
                }
                return 0;
            });
            console.log(temp, "temp");
            return temp;
        });
    };

    const sortDescending = () => {
        setUserData((prev) => {
            const temp = [...prev];

            temp.sort((a, b) => {
                if (a.username > b.username) {
                    return -1;
                }
                if (a.username < b.username) {
                    return 1;
                }
                return 0;
            });
            console.log(temp, "temp");
            return temp;
        });
    };

    return (
        <div className='body'>
            <h2>User Information </h2>
            <input
                type='text'
                placeholder='Serach'
                onChange={(event) => {
                    setSearchTerm(event.target.value.toLowerCase());
                }}
            />
            <button onClick={sortAscending}>Sort Ascending </button>
            <button onClick={sortDescending}>Sort Descending </button>

            <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}>
                <option value='Gender' disabled>
                    Gender
                </option>
                <option value='All'>All</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
            </select>

            <select
                value={countryFilter}
                onChange={(e) => setCountruFilter(e.target.value)}>
                <option value='Country' disabled defaultValue={"All"}>
                    Country
                </option>
                {countryList.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>

            <div className='table'>
                <div className='headRow tableRow'>
                    <span className='tableHead'>User Name</span>
                    <span className='tableHead'>First Name</span>
                    <span className='tableHead'>Last Name</span>
                    <span className='tableHead'>Email</span>
                    <span className='tableHead'>Gender</span>
                    <span className='tableHead'>Date of Birth</span>
                    <span className='tableHead'>Country</span>
                </div>
                {users.map((u) => (
                    <div className='tableRow' key={u.id}>
                        <span>{u.username}</span>
                        <span>{u.first_name}</span>
                        <span>{u.last_name}</span>
                        <span>{u.email}</span>
                        <span>{u.gender}</span>
                        <span>{u.dob}</span>
                        <span>{u.country}</span>
                    </div>
                ))}
            </div>

            <span>Items per page: </span>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='100'>100</option>
                <option value='1000'>All</option>
            </select>

            <div>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                    {currentPage} of {totalPage}
                </span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPage}>
                    Next
                </button>
            </div>
        </div>
    );
};
export default App;
