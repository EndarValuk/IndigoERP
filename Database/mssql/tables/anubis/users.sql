-- Change execute context, for a sure.
USE [IndyECM];
GO

-- Verify that the table does not exist.
IF OBJECT_ID('[Anubis].[Users]', 'U') IS NOT NULL
  DROP TABLE [Anubis].[Users];
GO

CREATE TABLE [Anubis].[Users] (
  [GUID] [bigint] NOT NULL,
  [Ref_Status] [int] NOT NULL DEFAULT 0,
  [Login] [nvarchar](50) NOT NULL,
  [Name] [nvarchar](255) NOT NULL,
  [Password] [varbinary](8000) NULL,
  [Patronymic] [nvarchar](255) NULL,
  [Surname] [nvarchar](255) NOT NULL,
  [Properties] [bigint] NOT NULL DEFAULT 1,
  [Lastchange_TimeStamp] [datetimeoffset](7) NULL DEFAULT SYSDATETIMEOFFSET(),
  [Create_TimeStamp] [datetimeoffset](7) NULL DEFAULT SYSDATETIMEOFFSET()

  CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([GUID]),
  CONSTRAINT [UQ_Users] UNIQUE ([Login])
)
GO

-- Verify that the sequence does not exist.
IF OBJECT_ID('[Anubis].[UsersSequence]', 'SO') IS NOT NULL
  DROP SEQUENCE [Anubis].[UsersSequence];
GO

CREATE SEQUENCE [Anubis].[UsersSequence]
AS BIGINT
  START WITH 1
    INCREMENT BY 1
      NO CYCLE
        NO CACHE;
GO