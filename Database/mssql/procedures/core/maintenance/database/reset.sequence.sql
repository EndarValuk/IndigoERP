-- Change execute context, for a sure.
USE [IndyECM];
GO

-- Verify that the stored procedure does not exist.
IF OBJECT_ID ('[Core].[Maintenance.Database.ResetSequence]', 'P') IS NOT NULL
  DROP PROCEDURE [Core].[Maintenance.Database.ResetSequence];
GO

---------------------------------------
-- Method to reset database sequence --
---------------------------------------
CREATE PROCEDURE [Core].[Maintenance.Database.ResetSequence] (
  @sequence nvarchar(MAX),
  @value bigint
)
WITH ENCRYPTION
AS
BEGIN TRANSACTION [ResetSequence]
  DECLARE @sql nvarchar(max);

  BEGIN TRY
    SET @sql = N'ALTER SEQUENCE ' + @sequence + ' RESTART WITH ' + cast(@value as nvarchar(255)) + ';';
    EXEC SP_EXECUTESQL @sql;

    COMMIT TRANSACTION [ResetSequence];
  END TRY

  BEGIN CATCH
    IF(@@TRANCOUNT > 0)
    BEGIN
      ROLLBACK TRANSACTION [ResetSequence];
    END;
  END CATCH
GO