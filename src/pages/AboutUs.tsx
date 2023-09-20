import React from 'react'
import { Grid, Typography, Paper, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { styled } from '@mui/system'
import Olha from '../images/photo_5199661638637179179_x.jpg'
import Nastya from '../images/photo_5199804356105456563_y.jpg'
import Sergey from '../images/photo.jpg'
import Footer from '../components/Footer'
import Header from '../components/Header'

const TeamMemberPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
}))

const TeamMemberImage = styled('img')({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: '16px',
})

const GitHubLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  color: theme.palette.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const GitHubIconStyled = styled(GitHubIcon)({
  marginRight: '8px',
  fontSize: '1.25rem',
})

interface TeamMember {
  name: string
  role: string
  bio: string
  github: string
  imageSrc: string
}

const team: TeamMember[] = [
  {
    name: 'Sergey',
    role: 'Frontend Developer',
    bio: 'Sergey has more than 4 years of experience in frontend development. He specializes in React, Redux, and UI/UX design. In the team, he is responsible for developing the user interface.',
    github: 'https://github.com/zero8273',
    imageSrc: Sergey,
  },
  {
    name: 'Olga',
    role: 'Lead Developer',
    bio: "Olga has over 2 years of experience in web application development and specializes in React and TypeScript. She leads the project, coordinates the team's work, and is responsible for the technical strategy.",
    github: 'https://github.com/PopovaOlha',
    imageSrc: Olha,
  },
  {
    name: 'Nastya',
    role: 'Backend Developer',
    bio: 'Nastya is responsible for the backend part of the application and databases. She has over 2 years of experience in backend development using Node.js and MongoDB. She takes care of server security and performance.',
    github: 'https://github.com/AnastasiiaDedela',
    imageSrc: Nastya,
  },
]

const AboutUs: React.FC = () => {
  return (
    <div>
      <Header subcategories={[]} />
      <div style={{ padding: '30px' }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{ textAlign: 'center', margin: 'auto', marginTop: '40px', marginBottom: '10px', fontWeight: 'bold' }}
        >
          About Us
        </Typography>
        <Grid container spacing={3}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TeamMemberPaper elevation={3}>
                <Grid container alignItems="center">
                  <Grid item>
                    <TeamMemberImage src={member.imageSrc} alt={member.name} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography variant="subtitle1">{member.role}</Typography>
                    <Typography variant="body2">{member.bio}</Typography>
                    <GitHubLink href={member.github} target="_blank" rel="noopener noreferrer">
                      <GitHubIconStyled />
                      GitHub Profile
                    </GitHubLink>
                  </Grid>
                </Grid>
              </TeamMemberPaper>
            </Grid>
          ))}
        </Grid>
        <div
          style={{
            border: '2px solid grey',
            padding: '25px 50px',
            marginTop: '30px',
            borderRadius: '8px',
            marginBottom: '90px',
            background: 'radial-gradient(592px at 48.2% 50%, rgba(255, 255, 249, 0.6) 0%, rgb(160, 199, 254) 74.6%)',
          }}
        >
          <Typography variant="h5">Our Wishes to You</Typography>
          <Typography variant="body1">
            We hope you enjoy using our product! Our team has put a lot of effort into creating a valuable and
            user-friendly experience for you. If you have any suggestions, feedback, or questions, please feel free to
            reach out to us. Your satisfaction is our priority!
          </Typography>
        </div>
        <div style={{ minWidth: '100%', position: 'relative' }}></div>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs
