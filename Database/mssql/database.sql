USE master;
GO

IF NOT EXISTS(SELECT [name] FROM [sys].[databases] WHERE [name] = N'IndyECM')
BEGIN
  CREATE DATABASE [IndyECM];
END
GO