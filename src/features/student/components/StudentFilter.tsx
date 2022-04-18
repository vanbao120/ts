import { Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import { City, ListParams } from 'models'
import React, { ChangeEvent, useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    filter: ListParams
    cityList: City[]
    onFilterChange?: (newFilter: ListParams) => void
    onSearchChange?: (newSearch: ListParams) => void
}

const StudentFilter = ({ filter, cityList, onFilterChange, onSearchChange }: Props) => {
    const searchRef = useRef<HTMLInputElement>()
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return
        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value,
            _page: 1
        }
        onSearchChange(newFilter)
    }

    const handleChangeCity = (e: SelectChangeEvent<HTMLInputElement>) => {
        if (!onFilterChange) return

        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined
        }
        onFilterChange(newFilter)
    }

    const handleSortChange = (e: SelectChangeEvent<string>) => {
        if (!onFilterChange) return
        const value: string = e.target.value
        const [ _sort, _order] = value.split('.')

        const newFilter: ListParams = {
            ...filter,
            _sort: _sort || undefined,
            _order: _order as 'asc' | 'desc' || undefined,
        }
        onFilterChange(newFilter)
    }

    const handleClear = () => {
        if (!onFilterChange) return

        const newFilter: ListParams = {
            ...filter,
            _sort: undefined,
            _order: undefined,
            _page: 1,
            city: undefined,
            name_like: undefined,
        }
        if(searchRef.current) {
            searchRef.current.value = ''
        }
        onFilterChange(newFilter)
    }
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel htmlFor="search-by-name">Search by Name</InputLabel>
                        <OutlinedInput
                            id="search-by-name"
                            onChange={handleSearch}
                            endAdornment={<SearchIcon />}
                            label="Search by name"
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="filterByCity">City</InputLabel>
                        <Select
                            labelId="filterByCity"
                            id="filterByCity"
                            label="City"
                            onChange={handleChangeCity}
                            value={filter.city || ''}
                        >
                            <MenuItem value=''><em>All</em></MenuItem>
                            {cityList?.map((city, idx) => (
                                <MenuItem value={city.code} key={idx}>{city.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="sortByType">Sort</InputLabel>
                        <Select
                            labelId="sortByType"
                            id="sortByType"
                            label="Sort"
                            value={filter?._sort ? `${filter._sort}.${filter._order}` : ''}
                            onChange={handleSortChange}
                        >
                            <MenuItem value=''><em>No sort</em></MenuItem>
                            <MenuItem value='name.asc'>Name ASC</MenuItem>
                            <MenuItem value='name.desc'>Name DESC</MenuItem>
                            <MenuItem value='mark.asc'>Mark ASC</MenuItem>
                            <MenuItem value='mark.desc'>Mark DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={1}>
                    <Button variant="outlined" color="primary" fullWidth onClick={handleClear}>Clear</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default StudentFilter