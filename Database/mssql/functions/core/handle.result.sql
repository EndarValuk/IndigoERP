-- Change execute context, for a sure.
USE [IndyECM];
GO

-- Verify that the table function does not exist.
IF OBJECT_ID('[Core].[Handle.Result]', 'TF') IS NOT NULL
  DROP FUNCTION [Core].[Handle.Result];
GO

------------------------------------------------
-- Method to handle internal database errors, --
-- and convert them to middleware knows flags --
------------------------------------------------
CREATE FUNCTION [Core].[Handle.Result] (
  @ErrorNumber int = NULL,
  @ErrorMessage nvarchar(MAX) = NULL
)
RETURNS @errorParsed TABLE (
  [Type] bigint NOT NULL DEFAULT 2,
  [Message] nvarchar(MAX) NULL
)
AS
BEGIN
  -- Unique constraint
  IF @ErrorNumber = 2627
  BEGIN
    -- ResultType.ErrorDatabaseCreateExists
    INSERT INTO @errorParsed VALUES (27034, @ErrorMessage);
  END
  ELSE IF @ErrorNumber IS NOT NULL
  BEGIN
    -- ResultType.ErrorDatabaseCreate
    INSERT INTO @errorParsed VALUES (8204, @ErrorMessage);
  END
  ELSE
  BEGIN
    -- ResultType.Success
    INSERT INTO @errorParsed VALUES (2, @ErrorMessage);
  END

  RETURN;
END
GO