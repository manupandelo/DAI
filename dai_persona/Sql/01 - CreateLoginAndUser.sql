USE [master]
GO
CREATE LOGIN [Persona] WITH PASSWORD=N'Persona', DEFAULT_DATABASE=[TP_DAI], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

USE [TP_DAI]
GO
CREATE USER [Persona] FOR LOGIN [Persona]
GO
USE [TP_DAI]
GO
ALTER ROLE [db_owner] ADD MEMBER [Persona]
GO
