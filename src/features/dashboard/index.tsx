import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { dashboardAction, selectDashBoardHighestList, selectDashBoardLoading, selectDashBoardLowestList, selectDashBoardRankings, selectDashBoardStatistic } from './dashboardSlice'
import { Box, Grid, LinearProgress, Typography } from '@mui/material'
import StatisticItem from './components/StatisticItem'
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { LABEL_STATISTICS } from 'constants/index'
import { styled } from '@mui/material/styles';
import Widget from './components/Widget'
import StudentRanking from './components/StudentRanking'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectDashBoardLoading)
  const statistics = useAppSelector(selectDashBoardStatistic)
  const highestList = useAppSelector(selectDashBoardHighestList)
  const lowestList = useAppSelector(selectDashBoardLowestList)
  const rankingList = useAppSelector(selectDashBoardRankings)

  useEffect(() => {
    dispatch(dashboardAction.fetchData())
  }, [dispatch])

  const LoadingProgress = styled(LinearProgress)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%'
  }))

  const BoxRoot = styled(Box)(({ theme }) => ({
    position: 'relative',
    paddingTop: theme.spacing(1)
  }))

  return (
    <BoxRoot>
      {loading && <LoadingProgress />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem label={LABEL_STATISTICS.MALE} value={statistics.maleCount} icon={<MaleIcon fontSize="large" color="primary" />} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem label={LABEL_STATISTICS.FEMALE} value={statistics.femaleCount} icon={<FemaleIcon fontSize="large" color="primary" />} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem label={LABEL_STATISTICS.HIGH} value={statistics.highMarkCount} icon={<ArrowUpwardIcon fontSize="large" color="primary" />} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem label={LABEL_STATISTICS.LOW} value={statistics.lowMarkCount} icon={<ArrowDownwardIcon fontSize="large" color="primary" />} />
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h4">All students</Typography>
        <Box mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRanking studentList={highestList}/>
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                <StudentRanking studentList={lowestList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h4">Ranking by city</Typography>
        <Box mt={5}>
          <Grid container spacing={3}>
            {rankingList.map((ranking) =>(
            <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
            <Widget title={ranking.cityName}>
              <StudentRanking studentList={ranking.rankingList}/>
            </Widget>
          </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </BoxRoot>
  )
}