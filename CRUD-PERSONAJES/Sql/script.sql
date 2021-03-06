USE [master]
GO
/****** Object:  Database [TP-Persona]    Script Date: 17/5/2022 08:22:21 ******/
CREATE DATABASE [TP-Persona]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TP-Persona', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\TP-Persona.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TP-Persona_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\TP-Persona_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [TP-Persona] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TP-Persona].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TP-Persona] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TP-Persona] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TP-Persona] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TP-Persona] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TP-Persona] SET ARITHABORT OFF 
GO
ALTER DATABASE [TP-Persona] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TP-Persona] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TP-Persona] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TP-Persona] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TP-Persona] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TP-Persona] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TP-Persona] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TP-Persona] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TP-Persona] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TP-Persona] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TP-Persona] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TP-Persona] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TP-Persona] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TP-Persona] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TP-Persona] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TP-Persona] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TP-Persona] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TP-Persona] SET RECOVERY FULL 
GO
ALTER DATABASE [TP-Persona] SET  MULTI_USER 
GO
ALTER DATABASE [TP-Persona] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TP-Persona] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TP-Persona] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TP-Persona] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TP-Persona] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'TP-Persona', N'ON'
GO
ALTER DATABASE [TP-Persona] SET QUERY_STORE = OFF
GO
USE [TP-Persona]
GO
/****** Object:  User [alumno]    Script Date: 17/5/2022 08:22:22 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[JoinPersonaPelicula]    Script Date: 17/5/2022 08:22:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JoinPersonaPelicula](
	[idRelacion] [int] IDENTITY(1,1) NOT NULL,
	[idPersona] [int] NOT NULL,
	[idMovie] [int] NOT NULL,
 CONSTRAINT [PK_JoinPersonaPelicula] PRIMARY KEY CLUSTERED 
(
	[idRelacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pelicula]    Script Date: 17/5/2022 08:22:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pelicula](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[titulo] [varchar](50) NOT NULL,
	[imagen] [varchar](80) NOT NULL,
	[fechacreacion] [date] NOT NULL,
	[calificacion] [int] NOT NULL,
 CONSTRAINT [PK_Pelicula] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Persona]    Script Date: 17/5/2022 08:22:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Persona](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[imagen] [varchar](80) NOT NULL,
	[edad] [int] NOT NULL,
	[peso] [int] NOT NULL,
	[historia] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Persona] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[JoinPersonaPelicula] ON 

INSERT [dbo].[JoinPersonaPelicula] ([idRelacion], [idPersona], [idMovie]) VALUES (1, 3, 2)
INSERT [dbo].[JoinPersonaPelicula] ([idRelacion], [idPersona], [idMovie]) VALUES (2, 1, 1)
INSERT [dbo].[JoinPersonaPelicula] ([idRelacion], [idPersona], [idMovie]) VALUES (3, 4, 2)
INSERT [dbo].[JoinPersonaPelicula] ([idRelacion], [idPersona], [idMovie]) VALUES (4, 4, 3)
SET IDENTITY_INSERT [dbo].[JoinPersonaPelicula] OFF
GO
SET IDENTITY_INSERT [dbo].[Pelicula] ON 

INSERT [dbo].[Pelicula] ([id], [titulo], [imagen], [fechacreacion], [calificacion]) VALUES (1, N'rapidos y furiosos', N'rapidosyfuriosos.jpg', CAST(N'2008-02-11' AS Date), 4)
INSERT [dbo].[Pelicula] ([id], [titulo], [imagen], [fechacreacion], [calificacion]) VALUES (2, N'son como niños', N'grownups.jpg', CAST(N'2010-10-10' AS Date), 2)
INSERT [dbo].[Pelicula] ([id], [titulo], [imagen], [fechacreacion], [calificacion]) VALUES (3, N'rocky', N'rocky.jpg', CAST(N'1998-02-02' AS Date), 5)
SET IDENTITY_INSERT [dbo].[Pelicula] OFF
GO
SET IDENTITY_INSERT [dbo].[Persona] ON 

INSERT [dbo].[Persona] ([id], [nombre], [imagen], [edad], [peso], [historia]) VALUES (1, N'manu', N'https://fondosmil.com/fondo/32009.jpg', 16, 58, N'estudia en ort')
INSERT [dbo].[Persona] ([id], [nombre], [imagen], [edad], [peso], [historia]) VALUES (2, N'valen', N'https://fondosmil.com/fondo/32009.jpg', 17, 72, N'estudia en ort')
INSERT [dbo].[Persona] ([id], [nombre], [imagen], [edad], [peso], [historia]) VALUES (3, N'gustavo', N'https://fondosmil.com/fondo/32009.jpg', 32, 96, N'etapa de volumen (sucio)')
INSERT [dbo].[Persona] ([id], [nombre], [imagen], [edad], [peso], [historia]) VALUES (4, N'luca', N'https://fondosmil.com/fondo/32009.jpg', 20, 50, N'va a la facultad')
SET IDENTITY_INSERT [dbo].[Persona] OFF
GO
ALTER TABLE [dbo].[JoinPersonaPelicula]  WITH CHECK ADD  CONSTRAINT [FK_JoinPersonaPelicula_Pelicula] FOREIGN KEY([idMovie])
REFERENCES [dbo].[Pelicula] ([id])
GO
ALTER TABLE [dbo].[JoinPersonaPelicula] CHECK CONSTRAINT [FK_JoinPersonaPelicula_Pelicula]
GO
ALTER TABLE [dbo].[JoinPersonaPelicula]  WITH CHECK ADD  CONSTRAINT [FK_JoinPersonaPelicula_Persona] FOREIGN KEY([idPersona])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[JoinPersonaPelicula] CHECK CONSTRAINT [FK_JoinPersonaPelicula_Persona]
GO
USE [master]
GO
ALTER DATABASE [TP-Persona] SET  READ_WRITE 
GO
