-- Change execute context, for a sure.
USE [IndyECM];
GO

-- Verify that the stored procedure does not exist.
IF OBJECT_ID ('[Anubis].[Create.User]', 'P') IS NOT NULL
  DROP PROCEDURE [Anubis].[Create.User];
GO

---------------------------
-- Method to create user --
---------------------------
CREATE PROCEDURE [Anubis].[Create.User] (
  @entity nvarchar(MAX)
)
WITH ENCRYPTION
AS
BEGIN TRANSACTION [CreateUser]
  DECLARE @GUID bigint = NEXT VALUE FOR [Anubis].[UsersSequence];

  BEGIN TRY
    INSERT INTO [Anubis].[Users]([GUID], [Login], [Name], [Patronymic], [Surname], [Password]) (
      SELECT
        @GUID,
        login,
        name,
        patronymic,
        surname,
        HASHBYTES('MD5', password + CAST(login AS NVARCHAR(50)))
      FROM OPENJSON(@entity)
      WITH
      (
        login nvarchar(50),
        name nvarchar(255),
        patronymic nvarchar(255),
        surname nvarchar(255),
        password nvarchar(MAX)
      )
    );

    COMMIT TRANSACTION [CreateUser];

    SELECT * FROM [Core].[Handle.Result](default, default);
    SELECT * FROM [Anubis].[Users] WHERE [GUID] = @GUID;
  END TRY

  BEGIN CATCH
    IF(@@TRANCOUNT > 0)
    BEGIN
      ROLLBACK TRANSACTION [CreateUser];
    END;

    EXECUTE [Core].[Maintenance.Database.ResetSequence] '[Anubis].[UsersSequence]', @GUID;

    SELECT * FROM [Core].[Handle.Result](ERROR_NUMBER(), ERROR_MESSAGE());
  END CATCH
GO