import React from 'react'
import { Grid, Typography, Paper, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { styled } from '@mui/system'

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
    name: 'Анна Ковалева',
    role: 'Главный разработчик',
    bio: 'Анна обладает более 10-летним опытом разработки веб-приложений и специализируется на React и TypeScript. Она руководит проектом, координирует работу команды и отвечает за техническую стратегию.',
    github: 'https://github.com/AnnaKoval',
    imageSrc: 'https://example.com/anna.jpg',
  },
  // Добавьте остальных участников команды аналогичным образом
]

const AboutUs: React.FC = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        О нас
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
                    GitHub профиль
                  </GitHubLink>
                </Grid>
              </Grid>
            </TeamMemberPaper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default AboutUs
